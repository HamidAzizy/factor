module.exports.default = Factor => {
  return {
    docs: {
      pages: [
        {
          doc: "quickstart",
          title: "Installation and Quickstart",
          description:
            "Quick start guide on how to install Factor framwork and Vue CMS in less than 5 minutes.",
          file: require("./docs/installation/index.md")
        },
        {
          doc: "",
          name: "Introduction",
          file: require("./docs/introduction/index.md"),
          title: "Introduction: Why Use Factor"
        },
        {
          group: "Dashboard and Posts"
        },
        {
          doc: "dashboard",
          file: require("./docs/service/setup.md"),
          title: "Setting Up the Dashboard and CMS"
        },

        {
          group: "Framework"
        },
        {
          doc: "framework",
          name: "Overview",
          file: require("./docs/framework/tools.md"),
          title: "Factor's VueJS Framework - Routes, Stores, Views"
        },
        {
          doc: "config",
          name: "Config",
          file: require("./docs/config/index.md"),
          title: "Factor Config and Setup CLI"
        },
        {
          doc: "cli",
          name: "Commands",
          file: require("./docs/cli/index.md"),
          title: "Using Factor CLI and Creating Custom Commands"
        },
        {
          doc: "filters",
          file: require("./docs/framework/filters.md"),
          title: "Factor Filters and Callbacks API"
        },
        {
          doc: "routes-and-stores",
          file: require("./docs/framework/routes-stores.md"),
          title: "Factor Routes and Stores"
        },
        {
          doc: "components",
          file: require("./docs/framework/components.md"),
          title: "Factor Components - Views and Elements"
        },

        {
          group: "Extensions"
        },
        {
          doc: "extending-factor",
          file: require("./docs/extension/index.md"),
          title: "Extending Factor"
        },
        {
          doc: "themes",
          file: require("./docs/extension/themes.md"),
          title: "Using and Creating Factor Themes"
        },
        {
          group: "Server"
        },
        {
          doc: "server-side-rendering",
          file: require("./docs/server/ssr.md"),
          title: "Factor Vue Server Side Rendering (SSR)"
        },
        {
          name: "Endpoints and Middleware",
          doc: "endpoints",
          file: require("./docs/server/endpoints.md"),
          title: "Creating and Using Factor Endpoints"
        },
        {
          name: "Hosting Your App",
          doc: "serving",
          file: require("./docs/server/serving.md"),
          title: "Hosting and Serving Your Factor App"
        }
      ],
      base: "guide"
    },
    site: {
      logo: () => import("./el/logo-factor"),
      nav: [
        {
          path: "/guide",
          name: "Development Guide"
        },
        {
          path: "/themes",
          name: "Themes"
        },
        {
          path: "/plugins",
          name: "Plugins"
        },
        // {
        //   path: "https://gitter.im/factorjs/community",
        //   name: "Community",
        //   icon: "gitter"
        // },
        {
          path: "https://github.com/fiction-com/factor",
          name: "Github",
          icon: "github"
        },
        {
          component: Factor.options.components["plugin-signin-profile-menu"]
        }
      ]
    },

    footer: {
      headline: "Released under the GPL-2 License",
      legal:
        "Copyright &copy; - <a href='https://www.fiction.com'>Fiction.com</a> and The Contibutors",
      logo: () => import("./el/logo-fiction")
    },
    home: {
      meta: {
        title: "Factor.js - VueJS Framework and Web App OS",
        description: "Factor is a modular CMS framework based on Vue.js.."
      },

      headline: "The Future of Frontend Development",
      subHeadline:
        "A platform for building impressive universal apps with VueJS, MongoDB and extensions.",
      graphic: require("./img/cms-engine.png"),
      boxes: [
        {
          icon: require("./img/icon-post.svg"),
          title: "Post System",
          description:
            "A powerful post pattern that makes CMS and eCommerce easy to add. "
        },
        {
          icon: require("./img/icon-plugin.svg"),
          title: "Plugins + Themes",
          description:
            "Factor is designed for drop-in, one-click extension. Building and using plugins and themes is easy."
        },
        {
          icon: require("./img/icon-time.svg"),
          title: "Famous 3-Minute Setup",
          description:
            "You'll be up and running in 3 minutes with a full-stack universal web app."
        }
      ],
      actions: [
        {
          btn: "primary",
          path: "/guide/quickstart",
          text: "Get Started"
        },
        {
          btn: "tertiary",
          path: "/guide",
          text: "Read the Docs"
        }
      ]
    }
  }
}