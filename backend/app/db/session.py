from prisma import Prisma

# Instância global do Prisma que será usada em toda a aplicação
prisma = Prisma()

async def connect_db():
    """Conecta ao banco de dados."""
    if not prisma.is_connected():
        await prisma.connect()

async def disconnect_db():
    """Desconecta do banco de dados."""
    if prisma.is_connected():
        await prisma.disconnect()