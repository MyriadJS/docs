import { myriad, MyriadScheme, MyriadGenerated, MyriadSettings } from "@myriadjs/core";

const settings = {
  readability: 4,
  foreground: {
    shade: [30, 60, 70],
  },
  background: {
    shade: [4, 8, 17],
  },
  accents: {
    shade: [35, 45, 55, 65, 75, 85],
  }
}

const defaultTheme = {
  name: "default",
  settings,
  scheme: {
    foreground: "#000000",
    background: "#ffffff",
    accents: ["#006585"],
    custom: {
      link: '#0000ff',
    },
  }
}

const cherryberryTheme = {
  name: "cherryberry",
  scheme: {
    foreground: "#430541",
    background: "#f4f5fa",
    accents: ["#ff355e"],
    custom: {
      link: '#0000ff',
    },
  },
  settings: {
    readability: 4,
    foreground: {
      shade: [30, 55, 65],
    },
    background: {
      shade: [10, 17, 25],
    },
    accents: {
      shade: [35, 45, 55, 65, 75, 85],
    }
  }
}

const nightshadeTheme = {
  name: "nightshade",
  scheme: {
    foreground: "#b1d1fc",
    background: "#030303",
    accents: ["#000088"],
    custom: {
      link: '#0000ff',
    },
  },
  settings: {
    readability: 4,
    foreground: {
      shade: [30, 55, 65],
    },
    background: {
      shade: [10, 17, 25],
    },
    accents: {
      shade: [35, 45, 55, 65, 75, 85],
    }
  }
}

const cyberpunkTheme = {
  name: "cyberpunk",
  scheme: {
    foreground: "#ffe0de",
    background: "#110022",
    accents: ["#cc2222"],
    custom: {
      link: '#0000ff',
    },
  },
  settings: {
    readability: 4,
    foreground: {
      shade: [30, 55, 65],
    },
    background: {
      shade: [10, 17, 25],
    },
    accents: {
      shade: [35, 45, 55, 65, 75, 85],
    }
  }
}

const serializeNonPOJOs = (value: object | null) => {
  return JSON.parse(JSON.stringify(value));
};

export const useTheme = defineStore('theme', () => {
  const isDark = shallowRef(false)
  const active = shallowRef(defaultTheme.name)
  const generated = shallowRef<MyriadGenerated>(serializeNonPOJOs(myriad(defaultTheme.scheme, defaultTheme.settings).colors))

  function setScheme(newTheme: {
    scheme: MyriadScheme,
    settings?: MyriadSettings
  }, name?: string) {
    const m = myriad({ ...generated.value.input.scheme, ...newTheme.scheme }, newTheme.settings ?  newTheme.settings : generated.value.input.settings)
    generated.value = serializeNonPOJOs(m.colors);
    isDark.value = m.isDark()
    active.value = name || 'custom'
    return m
  }

  function setThemeSettings(newsettings: MyriadSettings) {
    const m = myriad(generated.value.input.scheme,  { ...generated.value.input.settings, ...newsettings })
    generated.value = serializeNonPOJOs(m.colors)
    isDark.value = m.isDark()
    return m
  }

  function inverse() {
    const m = myriad(generated.value.input.scheme, generated.value.input.settings).inverse()
    return setScheme(m.colors.input || {})
  }

  return {
    generated,
    active,
    setScheme,
    setThemeSettings,
    isDark,
    inverse,
    themes: [
      defaultTheme,
      cherryberryTheme,
      cyberpunkTheme,
      nightshadeTheme
    ]
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTheme, import.meta.hot))
}


