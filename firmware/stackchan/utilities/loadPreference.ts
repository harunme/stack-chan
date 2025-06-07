import { type DOMAIN, PREF_KEYS } from 'consts'
import Preference from 'preference'
import structuredClone from 'structuredClone'
import config from 'mc/config'
import Modules from 'modules'

// biome-ignore lint/suspicious/noExplicitAny: Match the type definition of mc/config
const modConfig: Record<string, any> = Modules.has('mod/config') ? Modules.importNow('mod/config') : {}

export default function loadPreferences(category: keyof typeof DOMAIN) {
  const mcPreference = structuredClone(config[category.toLowerCase()] ?? {})
  const modPreferene = structuredClone(modConfig[category.toLowerCase()] ?? {})

  const preference = { ...mcPreference, ...modPreferene }

  const keys = PREF_KEYS.filter((s) => s[0] === category)
  for (const [domain, key, ctor] of keys) {
    const value = Preference.get(domain, key)
    if (value != null) {
      preference[key] = ctor(value)
    }
  }

  return preference
}
