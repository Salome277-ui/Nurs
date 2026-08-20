// ============================================================
//  CONFIGURA AQUÍ TU BOT (privado, no lo compartas con nadie)
// ============================================================
const TOKEN = 'MTUzOTc4MjY4MDczOTMyNDAwNg.GqTf7r.L4dHsXSBY_wJIVF0QYm1FQZmsKhIM0nv2rR-xg';
const CLIENT_ID = '1539782680739324006';
// ============================================================

const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('./keepalive');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Cargar comandos
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

// Cargar eventos
const interactionCreate = require('./events/interactionCreate');
const messageCreate = require('./events/messageCreate');

client.once('ready', () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', interaction => interactionCreate(client, interaction));
client.on('messageCreate', message => messageCreate(client, message));

if (TOKEN === 'PON_AQUI_TU_TOKEN_DEL_BOT' || CLIENT_ID === 'PON_AQUI_TU_CLIENT_ID') {
    console.error(
        '❌ Falta configurar TOKEN y CLIENT_ID en index.js antes de iniciar el bot.'
    );
    process.exit(1);
}

client.login(TOKEN);