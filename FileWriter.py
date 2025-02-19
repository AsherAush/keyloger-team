class FileWriter:
    def get_data(self,file_name:str,data:str):
        with open(file_name,"w") as file:
            file.write(data)

a=FileWriter()
a.get_data("test","shlomo")