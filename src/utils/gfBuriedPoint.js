var gfBuriedPoint = {
    TDAPP(eventId, label = '', key = '') {
        try {
            if (TDAPP) {
                console.log(eventId, label, key, 222)
                TDAPP.onEvent(eventId, label, key);
            }
        } catch (error) {
            console.log(error, 11)
        }

    }
};
export default gfBuriedPoint;