import { getModel, dbIsOffline } from "@factor/post/database"
import { pushToFilter, applyFilters } from "@factor/api"
import * as endpointHandler from "@factor/user/server"
import { Model, Document } from "mongoose"
import { addEndpoint } from "@factor/api/endpoints"
import { emitEvent } from "@factor/api/events"
import { userCredential } from "./jwt"
import { FactorUserCredential, AuthenticationParameters, FactorUser } from "./types"
import "./hooks-universal"

/**
 * Gets the post model associated with user post type
 */
export const getUserModel = <T = FactorUser>(): Model<T & Document> => {
  return getModel<T>("user")
}

/**
 * Authenticates users, signing them up if newAccount is set
 * @param params - authentication information
 */
export const authenticate = async (
  params: AuthenticationParameters
): Promise<FactorUserCredential | undefined> => {
  if (dbIsOffline()) {
    throw new Error(`Can't authenticate user, DB is offline.`)
  }

  const { newAccount, email, password, displayName } = params

  let user
  if (newAccount) {
    try {
      user = await getUserModel().create({
        email,
        password,
        displayName
      })
    } catch (error) {
      const e =
        error.code == 11000 ? `Account with email: "${email}" already exists.` : error
      throw new Error(e)
    }

    applyFilters("create-new-user", user)

    emitEvent("new-account-created", user)

    return userCredential(user)
  } else {
    user = await getUserModel().findOne({ email }, "+password")

    if (!user) {
      throw new Error(`Couldn't find user.`)
    }

    const compareResult =
      user && user.comparePassword ? await user.comparePassword(password) : false

    if (!compareResult) {
      throw new Error("Incorrect Login Information.")
    } else {
      user.signedInAt = Date.now()
      await user.save()

      return userCredential(user)
    }
  }
}

export const setup = (): void => {
  /**
   * Add user setup to CLI
   */
  if (!process.env.TOKEN_SECRET) {
    pushToFilter({
      key: "jwt",
      hook: "setup-needed",
      item: {
        title: "Token Secret",
        value:
          "A random JWT token secret is needed to encode user authentication information.",
        file: ".env",
        name: "TOKEN_SECRET"
      }
    })
  }

  /**
   * Adds the user handling endpoint
   */
  addEndpoint({ id: "user", handler: endpointHandler })
}
setup()
