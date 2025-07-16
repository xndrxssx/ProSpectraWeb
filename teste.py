import hid

#for d in hid.enumerate():
#    print(d)


import hid

h = hid.device()
h.open(0x0451, 0x4200)

packet = bytearray(64)
packet[0] = 0x00
packet[1] = 0xC0  # Flags: leitura + resposta
packet[2] = 0x00  # Sequence
packet[3] = 2     # Length LSB
packet[4] = 0     # Length MSB (2 bytes no total)
packet[5] = 0x16  # Command Byte (TIVA_VER)
packet[6] = 0x02  # Group Byte (TIVA)
h.write(packet)

resp = h.read(64)
print("Resposta:", resp)

