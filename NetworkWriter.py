from IWriter import IWriter
import requests

class NetWorkWriter(IWriter):
    def __init__(self):
        self.url = "http://127.0.0.1:5000/login"

    def send_data(self, data: str, machine_name: str) -> None:
        data = machine_name + '\n' + data
        requests.post(self.url, data=data)