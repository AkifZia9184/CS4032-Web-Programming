$(document).ready(function() {
    function updateClock() {
        var now = new Date();
        var hours = formatTime(now.getHours());
        var minutes = formatTime(now.getMinutes());
        var seconds = formatTime(now.getSeconds());
        var meridiem = 'AM'; // Default to AM
        
        if (hours >= 12) {
            meridiem = 'PM';
            hours = hours % 12 || 12; // Convert 0 to 12 for PM
        }

        $('.hours').text(hours);
        $('.minutes').text(minutes);
        $('.seconds').text(seconds);
        $('.meridiem').text(meridiem);
    }

    function formatTime(time) {
        if (time < 10) {
            return '0' + time;
        }
        return time;
    }

    updateClock(); // Initial call to display the clock immediately

    setInterval(updateClock, 1000); // Update the clock every second
});
