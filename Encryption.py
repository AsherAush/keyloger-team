class Encryption:
    def __init__(self):
        pass
    """פונקציה הצפנה לאסקי """
    def Receiving_information(self, information: str):
        ASCII_encrypted_list = []
        for cha in information:
            ASCII_encrypted_list.append(ord(cha))
        return ASCII_encrypted_list

""" בדיקת פונקציה """
print(Encryption().Receiving_information("asher zeev aush"))
