Right now, this is a couple of Azure functions for retrieving toll data from the WS DOT API.

**QueueData** queries the API on a regular basis, and queues event hub messages with toll rates.
**TollQuery** is a simple HTTP triggered function that transforms the toll data into a simple page.