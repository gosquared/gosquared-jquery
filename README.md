# GoSquared jQuery Plugin

Enables you to easily use the GoSquared API and also GoSquared event tracking.

## Usage

### Event tracking

View our [Events documentation](https://www.gosquared.com/support/articles/966409-targets-gosquared-event-tracking-integration-guide)

To simply track an event when an element is clicked
```javascript
// click is the default event listener if events aren't specified
$('.element').track('Clicked my button');
```

To track GoSquared events on different event listeners...
```javascript
$('.element').track({
	name: 'Hovered or clicked on my button',
	events: 'hover click'
});

// or alternatively...
$('.element').track({
	name: 'Hovered or clicked on my button',
	events: ['hover','click']
});
```

To add additional parameters to be tracked with the event
```javascript
$('.element').track({
	name: 'Additional parameters',
	params: {
		user: 1,
		user_name: 'GoSquared'
	}
});
```

To call functions before and/or after an event is tracked
```javascript
$('.element').track({
	name: 'Test',
	beforeSend: function() {
		// well then...
	},
	afterSend: function() {
		// I finished
	}
})
```

All together now!
```javascript
$('.element').track({
	name: 'Hello!',
	params: {
		wow: 'this is cool',
		i: 'can track custom parameters'
	},
	events: ['hover','click'],
	beforeSend: function() {
		console.log('sending event');
	},
	afterSend: function() {
		console.log('sent event');
	}
});
```

### API

WARNING: Exposing your API key publicly can give people access to some of your account settings, please be careful. We recommend using the PHP SDK or node.js module as a proxy for public API calls.

View our [API Documentation](https://gosquared.com/developer)

#### Setup

Provide $.GoSquared with a default configuration object. These parameters will be used on every API call unless you override them. API key and site token are required.
```javascript
$.GoSquared({
	api_key: 'YOUR_API_KEY',
	site_token: 'YOUR_SITE_TOKEN'
});
```

#### Calls

With just a callback function...
```javascript
$.GoSquared.concurrents(function(err,data) {
	if (err) {
		console.log('oh noes!',err);
		return;
	}
	console.log('success!',data);
});
```

And with additional parameters
```javascript
$.GoSquared.pages({
		limit: 5
	},
	function(err,data) {
		// oh hi
	}
);
```

## Contributing

Contributions are very welcome. Please run `make build` to generate the minified code and open a pull request.
