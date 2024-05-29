import * as PanelMenu from '@girs/gnome-shell/ui/panelMenu'
import St from 'gi://St'
import Gio from 'gi://Gio'
import { registerGObjectClass } from '@/types/gjs'

const INDICATOR_ICON = 'clash'

@registerGObjectClass
export class ClashIndicator extends PanelMenu.Button {
    constructor() {
        super(0, 'ClashIndicator', false)
        this.init()
    }

    init() {
        const hbox = new St.BoxLayout({
            styleClass: 'clash-indicator-hbox',
        })

        const icon = new St.Icon({
            iconName: INDICATOR_ICON,
            styleClass: 'clash-indicator-icon',
        })

        hbox.add_child(icon);
        this.add_child(hbox);
    }
}
