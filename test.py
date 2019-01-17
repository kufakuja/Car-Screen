
from kivy.app import App
from kivy.uix.tabbedpanel import TabbedPanel
from kivy.lang import Builder
from kivy.config import Config

Builder.load_string("""

<MainMenu>:
    size_hint: 1, 1
    pos_hint: {'center_x': .5, 'center_y': .5}
    default_tab: home_tab
    tab_pos: 'right_top'
    tab_width: 120
    tab_height: 120

    canvas.before:
        Color:
            rgb: 0.3372549, 0.5215686, 0.6705882
        Rectangle:
            pos: self.pos
            size: self.size
    FloatLayout:
        RstDocument:
            id: nav_content
            text: 'Nav content'
        RstDocument:
            id: audio_content
            text: 'Audio content'
        RstDocument:
            id: home_content
            text: 'Home content'
        RstDocument:
            id: temp_content
            text: 'Temp content'
        RstDocument:
            id: camera_content
            text: 'Camera content'

    TabbedPanelHeader:
        id: nav_tab
        border: 0, 0, 0, 0
        content: nav_content.__self__
        Scatter:
            do_translation: False
            do_scale: False
            do_rotation: False
            auto_bring_to_front: False
            rotation: 90
            size_hint: None,None
            size: audio_img.size
            center_x: nav_tab.center_x
            Image:
                id: nav_img
                source: 'nav_inactive.png'\
                    if nav_tab.state == 'normal' else 'nav_active.png'
                size: nav_tab.size
                allow_stretch: True
                keep_ratio: False
    TabbedPanelHeader:
        id: audio_tab
        border: 0, 0, 0, 0
        content: audio_content.__self__
        Scatter:
            do_translation: False
            do_scale: False
            do_rotation: False
            auto_bring_to_front: False
            rotation: 90
            size_hint: None,None
            size: audio_img.size
            center_x: audio_tab.center_x
            Image:
                id: audio_img
                source: 'audio_inactive.png'\
                    if audio_tab.state == 'normal' else 'audio_active.png'
                size: audio_tab.size
                allow_stretch: True
                keep_ratio: False

    TabbedPanelHeader:
        id: home_tab
        border: 0, 0, 0, 0
        content: home_content.__self__
        background_normal:'home_inactive.png'
        background_down:'home_active.png'
    TabbedPanelHeader:
        id: temp_tab
        border: 0, 0, 0, 0
        content: temp_content.__self__
        Scatter:
            do_translation: False
            do_scale: False
            do_rotation: False
            auto_bring_to_front: False
            rotation: 90
            size_hint: None,None
            size: audio_img.size
            center_x: temp_tab.center_x
            Image:
                id: temp_img
                source: 'temp_inactive.png'\
                    if temp_tab.state == 'normal' else 'temp_active.png'
                size: temp_tab.size
                allow_stretch: True
                keep_ratio: False
    TabbedPanelHeader:
        id: camera_tab
        border: 0, 0, 0, 0
        content: camera_content.__self__
        Scatter:
            do_translation: False
            do_scale: False
            do_rotation: False
            auto_bring_to_front: False
            rotation: 90
            size_hint: None,None
            size: camera_img.size
            center_x: camera_tab.center_x
            Image:
                id: camera_img
                source: 'camera_inactive.png'\
                    if camera_tab.state == 'normal' else 'camera_active.png'
                size: camera_tab.size
                allow_stretch: True
                keep_ratio: False

""")


class MainMenu(TabbedPanel):
    pass


class TabbedPanelApp(App):
    def build(self):
        return MainMenu()


if __name__ == '__main__':
    Config.set('graphics', 'width', '1024')
    Config.set('graphics', 'height', '600')
    TabbedPanelApp().run()
