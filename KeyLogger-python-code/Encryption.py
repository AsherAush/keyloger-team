class Encryption:
    def __init__(self, xor ):
        self.xor = xor

    """פונקציה הצפנה לאסקי """

    def xor_encryption(self, data):
        return "".join(chr(ord(c) ^ self.xor) for c in data)

    """פןנקציה לפענוח ההצפנה """

    def xor_decryption(self, data):
        return "".join(chr(ord(c) ^ self.xor) for c in data)


""" בדיקת פונקציה """
# a = Encryption(3).xor_encryption("asher zeev aush")
# print(a)
# print(Encryption(3).xor_decryption(a))
