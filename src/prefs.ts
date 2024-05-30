import { ExtensionPreferences } from '@girs/gnome-shell/extensions/prefs'

import { Adw } from '@girs/adw-1'
import { Gio } from '@girs/gio-2.0'
import { Gtk } from '@girs/gtk-4.0'

export default class ClashPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: 'General',
            iconName: 'dialog-information-symbolic',
        })
        window.add(page)

        const group = new Adw.PreferencesGroup({
            title: 'Appearance',
            description: 'Configure the appearance of the extension',
        })
        page.add(group)

        // Create a new preferences row
        const row = new Adw.SwitchRow({
            title: 'Show Indicator',
            subtitle: 'Whether to show the panel indicator',
        })
        group.add(row)

        const coreAry = ['clash-meta', 'clash-meta-alpha', 'clash-premium']

        const coreList = new Gtk.StringList()
        coreAry.forEach((x) => coreList.append(x))

        const clashCoreSelect = new Adw.ComboRow({
            title: '切换内核',
            model: coreList,
        })
        group.add(clashCoreSelect)

        // Create a settings object and bind the row to the `show-indicator` key
        window._settings = this.getSettings()
        window._settings.bind(
            'show-indicator',
            row,
            'active',
            Gio.SettingsBindFlags.DEFAULT
        )
    }
}
