# Kafka Event Producer

This code represents a Kafka producer for generating random e-commerce events, including product views, cart additions, and sales. It allows you to send messages to a specified Kafka topic at a configurable rate and repeat the process as desired.

## Setup

To install the required packages, run:

```bash
pip3 install click confluent-kafka faker dotenv

```

## Configuration

The code accepts several command-line options for customizing the Kafka producer:

- `-topic`: Kafka topic to send messages to (default: `ecomm_ux_demo`).
- `-sample`: Number of messages to send in each repeat (default: 10,000).
- `-sleep`: Sleep time between message batches (default: 1 second).
- `-mps`: Number of messages per sleep (default: 200).
- `-repeat`: Number of times to repeat the message sending process (default: 1).
- `-bootstrap-servers`: Kafka bootstrap servers.
- `-security_protocol`: Security protocol (default: `SASL_SSL`).
- `-sasl_mechanism`: SASL mechanism (default: `PLAIN`).
- `-sasl_plain_username`: SASL plain username.
- `-sasl_plain_password`: SASL plain password.
- `-utc`: Use UTC datetime for timestamp (default: True).
- `-bcp`: Additional flag (default: False).

## Usage

You can execute the script with the desired options as follows:

```bash
python3 gen_kafka.py

```

For example, to send 100 messages to the `ecomm_ux_demo` topic, you can run:

```bash
python3 gen_kafka.py -topic ecomm_ux_demo -sample 100

```

## Security Notice

Ensure to keep the SASL credentials secure and avoid exposing them in a public repository.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests.

Please note that this README file is constructed to understand the given code and assumes that all the necessary environment setup, including Kafka brokers, are already in place.

URLs for dependencies:

- Click: <https://click.palletsprojects.com/>
- Confluent Kafka: <https://github.com/confluentinc/confluent-kafka-python>
- Faker: <https://faker.readthedocs.io/>
