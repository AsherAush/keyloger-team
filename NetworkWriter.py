from IWriter import IWriter

class FileWrite(IWriter):
    def send_data(self, data, machine_name):
        machine_name = machine_name.replace(":","_")
        with open(f"{machine_name}.json", "w") as file:
            file.write(data)