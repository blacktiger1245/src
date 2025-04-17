const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('answer')
        .setDescription('Send a response message to a user.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to send the message to.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message to send to the user.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const messageContent = interaction.options.getString('message');

        const embed = new EmbedBuilder()
            .setTitle('You have received a message!')
            .setDescription(messageContent)
            .setColor(0x2b2d31)
            .setThumbnail('https://i.imgur.com/4M34hi2.png')
            .setImage('https://cdn.discordapp.com/attachments/1348688636455030857/1361802547534500100/undefined_-_Imgur.jpg?ex=680014f4&is=67fec374&hm=f67fce6b153246c719537f7b5e2b5e6802f8d44ab09b0ff1e3d276c9fad28c65');

        try {
            await user.send({ embeds: [embed] });
            await interaction.reply({ content: `Successfully sent the message to ${user.tag}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Failed to send the message to ${user.tag}.`, ephemeral: true });
        }
    },
};