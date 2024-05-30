import {
    Extension,
    ExtensionMetadata,
} from '@girs/gnome-shell/extensions/extension'
import * as Main from '@girs/gnome-shell/ui/main'
import { ClashIndicator } from './components/indicator'

export default class ClashExtension extends Extension {
    clashIndicator: InstanceType<typeof ClashIndicator> | null

    constructor(metadata: ExtensionMetadata) {
        super(metadata)
    }

    enable() {
        this.clashIndicator = new ClashIndicator({
            openSettings: this.openPreferences.bind(this),
        })

        Main.panel.addToStatusArea('clashIndicator', this.clashIndicator, 1)
    }

    disable() {
        this.clashIndicator?.destroy()
        this.clashIndicator = null
    }
}
