import $ from 'jquery';

const Plugin = (($) => {
    const greetings = ['Hello', 'world', '!!'];
    const [hello, world, explamation] = greetings;
    const [, ...worldex] = greetings;

    $('#es6').html(`<p>${hello} ${world}${explamation}. Lets do some awesome coding${worldex[1]}</p>`);
})($);

export default Plugin;
