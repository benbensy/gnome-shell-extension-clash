import * as PanelMenu from '@girs/gnome-shell/ui/panelMenu'
import * as PopupMenu from '@girs/gnome-shell/ui/popupMenu'
import { registerGObjectClass } from '@/utils/gjs'
import {St} from '@girs/st-14'
import { request } from '@/api'

const INDICATOR_ICON = 'clash-indicator-symbolic'

@registerGObjectClass
export class ClashIndicator extends PanelMenu.Button {
    openSettings: () => void
    constructor(options: { openSettings: () => void }) {
        super(0, 'ClashIndicator', false)
        ;(this.openSettings = options.openSettings), this.init()
    }

    init() {
        const hbox = new St.BoxLayout({
            styleClass: 'clash-indicator-hbox',
        })

        const icon = new St.Icon({
            iconName: INDICATOR_ICON,
            styleClass: 'clash-indicator-icon',
        })

        hbox.add_child(icon)
        new PanelMenu.Button(0, 'ClashIndicator', false).add_child(hbox)

        this.bindMenu()
    }

    async bindMenu() {
        const switchItem = new PopupMenu.PopupMenuItem('启用')
        switchItem.connect('activate', (it: PopupMenu.PopupMenuItem, ev) => {
            it.label.text = '禁用'
        })

        const settingsItem = new PopupMenu.PopupMenuItem('设置')
        settingsItem.insert_child_at_index(
            new St.Icon({
                iconName: 'preferences-system-symbolic',
                styleClass: 'clash-menu-icon',
            }),
            0
        )
        const testFetchItem = new PopupMenu.PopupMenuItem('发送请求');
        testFetchItem.connect('activate', (it: PopupMenu.PopupMenuItem, ev) => {
            request('http://127.0.0.1:8848')
        })

        ;(this.menu as PopupMenu.PopupMenu).addMenuItem(switchItem)
        ;(this.menu as PopupMenu.PopupMenu).addMenuItem(settingsItem)
        ;(this.menu as PopupMenu.PopupMenu).addMenuItem(testFetchItem)

        settingsItem.connect('activate', this.openSettings)
    }
}
