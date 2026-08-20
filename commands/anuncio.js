const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anuncio')
        .setDescription('Envía un anuncio a un canal'),

    async execute(interaction) {
        const { buildAnuncioModal } = require('../interfaces/modals');
        await interaction.showModal(buildAnuncioModal());
    }
};