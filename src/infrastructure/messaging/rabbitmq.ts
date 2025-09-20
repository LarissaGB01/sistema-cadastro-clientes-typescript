import amqp from "amqplib";

let channel: amqp.Channel;
const QUEUE_NAME = "clientes.fila.v2";

export async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log("📡 Conectado ao RabbitMQ");
    } catch (err) {
        console.error("❌ Erro ao conectar com RabbitMQ:", err);
    }
}

export function publishToQueue(message: object) {
    try {
        if (!channel) {
            console.error("❌ Canal RabbitMQ não inicializado");
            return;
        }

        const payload = JSON.stringify(message);
        const sent = channel.sendToQueue(QUEUE_NAME, Buffer.from(payload), {
            persistent: true,
            contentType: "application/json",
        });

        if (sent) {
            console.log("✅ Mensagem publicada na fila:", payload);
        } else {
            console.warn("⚠️ Falha ao publicar a mensagem (sendToQueue retornou false)");
        }
    } catch (err) {
        console.error("❌ Erro ao publicar mensagem na fila:", err);
    }
}