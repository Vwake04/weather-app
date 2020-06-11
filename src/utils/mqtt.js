const mqtt = require("mqtt");

class MQTT {
    constructor(mqttURL, topic) {
        this.client = mqtt.connect(mqttURL);
    }

    changeState(subscribeTopic, publishTopic, status){
        this.client.subscribe(subscribeTopic);
        this.client.on("message", (topic, state) => {
            state = JSON.parse(state.toString());
            this.client.unsubscribe(subscribeTopic);
            if(state.status === status){
                console.log(`It's alread ${status}`);
                return;
            }
            // state.status = !state.status;
            this.client.publish(publishTopic, JSON.stringify(state));
        });
    }

    publish(topic, message, seconds){
        setInterval(() => {
            this.client.publish(topic, message);
        }, seconds)
    }

    subscribe(topic, callback){
        this.client.subscribe(topic);
        this.client.on("message", (topic, message) => {
            callback(message);
        })
    }
}

module.exports = MQTT;
// const fan = new MQTT('mqtt://test.mosquitto.org');
// fan.sendMessage("test", "Hello world!", 1000);