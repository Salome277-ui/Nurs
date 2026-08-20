// ============================================================
//  Usa los MISMOS datos que pusiste en index.js
//  GUILD_ID es opcional: si lo pones, los comandos aparecen
//  al instante SOLO en ese servidor (ideal para pruebas).
//  Si lo dejas vacío, se registran de forma global
//  (pueden tardar hasta 1 hora en aparecer, pero funcionan
//  en todos los servidores donde esté el bot).
// ============================================================
const TOKEN = 'MTUzOTc4MjY4MDczOTMyNDAwNg.GqTf7r.L4dHsXSBY_wJIVF0QYm1FQZmsKhIM0nv2rR-xg';
const CLIENT_ID = '1539782680739324006';
const GUILD_ID = ''; // opcional, ej: '123456789012345678'
// ============================================================

const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos...`);

        const route = GUILD_ID
            ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
            : Routes.applicationCommands(CLIENT_ID);

        await rest.put(route, { body: commands });

        console.log('✅ Comandos registrados correctamente.');
        if (!GUILD_ID) {
            console.log('ℹ️ Son comandos globales, pueden tardar hasta 1 hora en aparecer.');
        }
    } catch (error) {
        console.error('❌ Error registrando comandos:', error);
    }
})();