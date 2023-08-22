# gen_pubsub

`gen_pubsub` is a Python script that generates random JSON-encoded events and publishes them to a specified Google Cloud Pub/Sub topic.

## Prerequisites

- Python 3.x

## Configuration

Before running the script, you need to set up the following parameters:

- `project_id`: Your Google Cloud Project ID.
- `topic_id`: The ID of the Pub/Sub topic you want to send messages to.
- Other variables, like `country`, `environment`, `publisher_id`, can be customized as needed.

### Dependencies

In order to use this library, you first need to go through the following steps:

1. [Select or create a Cloud Platform project.](https://console.cloud.google.com/project)
2. [Enable billing for your project.](https://cloud.google.com/billing/docs/how-to/modify-project#enable_billing_for_a_project)
3. [Enable the Google Cloud Pub / Sub API.](https://cloud.google.com/pubsub)
4. [Setup Authentication.](https://googleapis.dev/python/google-api-core/latest/auth.html)

You'll also need to install the `google-cloud-pubsub` package using the following command:

```bash
pip3 install google-cloud-pubsub
```

## Usage

After configuring the variables, you can simply run the script with:

```bash
python3 gen_pubsub.py
```

## Output

The script will continuously generate and publish random JSON-encoded events to the specified Pub/Sub topic and print the sent data to the console.
Customization

You can customize the products, event types, cities, and other attributes by modifying the corresponding lists and weights in the code.
Hardcoded JSON Object

If you want to append a hardcoded JSON object to the event data, you can uncomment the related lines and update the path to point to your JSON file.
License
