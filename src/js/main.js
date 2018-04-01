$(document).ready(() => {
    const url     = '/data/data.json?ver=1.0.10';
    const options = {
        width: 100,
        height: 100,
        padding: 0,
        showOutline: false,
        strokeColor: '#3cb4b4',
        radicalColor: '#d63a37'
    };

    let writerFront;
    let writerFront2;
    let writerBack;
    let writerBack2;
    let dictionary   = [];
    let sequence     = [];
    let currentCard  = 0;
    let cardSize     = 0;
    let lesson       = $('#lesson option:selected').val() * 1;
    let dialogue     = lesson === 0 ? $('input[name=dialogue-0]:checked').val() : $('input[name=dialogue]:checked').val() * 1;

    /*
    let categories  = {
        'all':      true,
        'radicals': true,
        'number':   true,
        'composed': true
    };
    */

    function drawCharacter(cardPosition, canvas) {
        /* Solves the multiple characters rendered at once problem */
        if ($('#flashcard--character--front svg > g').length > 1) {
            $('#flashcard--character--front').find('svg > g:not(:last)').remove();
            /* console.log('there was a problem with front') */
        } else if ($('#flashcard--character--front-2 svg > g').length > 1) {
            $('#flashcard--character--front-2').find('svg > g:not(:last)').remove();
            /* console.log('there was a problem with front 2') */
        }

        if ($('#flashcard--character--back svg > g').length > 1) {
            $('#flashcard--character--back').find('svg > g:not(:last)').remove();
            /* console.log('there was a problem with back') */
        } else if ($('#flashcard--character--back-2 svg > g').length > 1) {
            $('#flashcard--character--back-2').find('svg > g:not(:last)').remove();
            /* console.log('there was a problem with back 2') */
        }

        /* eslint no-lonely-if: "warn" */
        if (canvas === 'front') {
            if (dictionary.items[cardPosition].character.length === 1) {
                writerFront.setCharacter(dictionary.items[cardPosition].character);
                $('#flashcard--character--front-2').css({ display: 'none' });
            } else {
                if (writerFront2 === undefined) {
                    $('#flashcard--character--front').html('');
                    writerFront  = new HanziWriter('flashcard--character--front', dictionary.items[cardPosition].character[0], options);
                    writerFront2 = new HanziWriter('flashcard--character--front-2', dictionary.items[cardPosition].character[1], options);
                } else {
                    writerFront.setCharacter(dictionary.items[cardPosition].character[0]);
                    writerFront2.setCharacter(dictionary.items[cardPosition].character[1]);
                }

                $('#flashcard--character--front-2').css({ display: 'block' });
            }
        } else {
            if (dictionary.items[cardPosition].character.length === 1) {
                writerBack.setCharacter(dictionary.items[cardPosition].character);
                $('#flashcard--character--back-2').css({ display: 'none' });
            } else {
                if (writerBack2 === undefined) {
                    $('#flashcard--character--back').html('');
                    writerBack  = new HanziWriter('flashcard--character--back', dictionary.items[cardPosition].character[0], options);
                    writerBack2 = new HanziWriter('flashcard--character--back-2', dictionary.items[cardPosition].character[1], options);
                } else {
                    writerBack.setCharacter(dictionary.items[cardPosition].character[0]);
                    writerBack2.setCharacter(dictionary.items[cardPosition].character[1]);
                }

                $('#flashcard--character--back-2').css({ display: 'block' });
            }
        }

        $('.flashcard--card-number').html(((cardPosition * 1) + 1));
        $('.flashcard--meaning').html(dictionary.items[cardPosition].meaning);
        $('.flashcard--pinyin').html(dictionary.items[cardPosition].pinyin);
    }

    function getCard(cardPosition) {
        drawCharacter(cardPosition, 'front');

        if ($('.flashcard').hasClass('flashcard--flip')) {
            $('.flashcard').removeClass('flashcard--flip');

            setTimeout(() => {
                drawCharacter(cardPosition, 'back');
            }, 500);
        } else {
            drawCharacter(cardPosition, 'back');
        }
    }

    function sequenceGenerator(isRandom) {
        const possibleSequence = [];
        const generatedSequence = [];
        let seed = 0;
        let size = dictionary.items.length;

        if (lesson === -1) {
            for (let i = 0; i < size; i += 1) {
                possibleSequence.push(i);
            }
        } else if (dialogue !== 'all') {
            for (let i = 0; i < size; i += 1) {
                if (dictionary.items[i].lesson === lesson
                    && dictionary.items[i].dialogue === dialogue) {
                    possibleSequence.push(i);
                }
            }
        } else {
            for (let i = 0; i < size; i += 1) {
                if (dictionary.items[i].lesson === lesson) {
                    possibleSequence.push(i);
                }
            }
        }

        if (!isRandom) {
        // listing(size, possibleSequence);
            return possibleSequence;
        }

        size = possibleSequence.length;

        for (let i = 0; i < size; i += 1) {
            seed = Math.floor(Math.random() * possibleSequence.length);
            generatedSequence.push(possibleSequence[seed]);
            possibleSequence[seed] = possibleSequence[0];
            /* removes the first item on the array */
            possibleSequence.shift();
        }

        /* console.log('generatedSequence', generatedSequence); */

        // listing(size, generatedSequence);

        /* console.log('generated:', generatedSequence.sort(function(a, b) {return a - b})); */
        return generatedSequence;
    }

    function setup() {
        if (dictionary.items[0].character.length === 1) {
            writerFront = new HanziWriter('flashcard--character--front', dictionary.items[sequence[currentCard]].character, options);
            writerBack  = new HanziWriter('flashcard--character--back', dictionary.items[sequence[currentCard]].character, options);

            $('#flashcard--character--front-2').css({ display: 'none' });
            $('#flashcard--character--back-2').css({ display: 'none' });
        } else {
            writerFront  = new HanziWriter('flashcard--character--front', dictionary.items[sequence[currentCard]].character[0], options);
            writerFront2 = new HanziWriter('flashcard--character--front-2', dictionary.items[sequence[currentCard]].character[1], options);
            writerBack   = new HanziWriter('flashcard--character--back', dictionary.items[sequence[currentCard]].character[0], options);
            writerBack2  = new HanziWriter('flashcard--character--back-2', dictionary.items[sequence[currentCard]].character[1], options);
        }

        $('.flashcard--card-number').html(sequence[((currentCard * 1) + 0) ] + 1);
        $('.flashcard--meaning').html(dictionary.items[0].meaning);
        $('.flashcard--pinyin').html(dictionary.items[0].pinyin);
    }

    function listing(size, order) {
        let meaning;
        let character;
        let pinyin;
        const review = [11, 19, 31, 33, 39, 37, 27, 51, 42, 47, 35, 29, 43, 2, 21];
        const learn  = [84, 63, 79, 57, 72, 66, 92, 89, 40, 83, 71, 78, 70, 85, 74,
            55, 94, 69, 64, 90, 91, 81, 82, 73, 34, 93, 76, 65, 58, 75];

        $('#quiz').html('');
        $('#review').html('');
        $('#learn').html('');

        for (let i = 0; i < size; i += 1) {
            [meaning] = dictionary.items[order[i]].meaning;
            // $('#quiz').append($('<div><span class="number">' + (order[i] + 1) + ')
            // </span><span class="definition">'
            // + meaning + '</span></div>'));
            $('#quiz').append($(`<div><span class="number">${(order[i] + 1)}) </span><span class="definition">${meaning}</span></div>`));
        }

        for (let i = 0; i < review.length; i += 1) {
            [meaning] = dictionary.items[review[i] - 1].meaning;
            [pinyin] = dictionary.items[review[i] - 1].pinyin;

            if (dictionary.items[review[i] - 1].character.length === 1) {
                [character] = dictionary.items[review[i] - 1].character;
            } else {
                [character] = `${dictionary.items[review[i] - 1].character[0]}${dictionary.items[review[i] - 1].character[1]}`;
            }

            /* $('#review').append($('<div><span class="number">'
                + review[i] + ')</span><span class="character">' + character
                + ' </span><span class="definition">' + pinyin + ' - '
                + meaning + '</span></div>'));
            */
            $('#review').append($(`<div><span class="number">${review[i]})</span><span class="character">${character}</span><span class="definition">${pinyin} - ${meaning}</span></div>`));
        }

        for (let i = 0; i < learn.length; i += 1) {
            [meaning] = dictionary.items[learn[i] - 1].meaning;
            [pinyin] = dictionary.items[learn[i] - 1].pinyin;

            if (dictionary.items[learn[i] - 1].character.length === 1) {
                [character] = dictionary.items[learn[i] - 1].character;
            } else {
                [character] = `${dictionary.items[learn[i] - 1].character[0]}${dictionary.items[learn[i] - 1].character[1]}`;
            }

            $('#learn').append($(`<div><span class="number">${learn[i]})</span><span class="character">${character}</span><span class="definition">${pinyin} - ${meaning}</span></div>`));
        }

        $('#cha').html('');

        for (let i = 0; i < review.length; i += 1) {
            if (dictionary.items[review[i] - 1].character.length === 1) {
                [character] = dictionary.items[review[i] - 1].character;
            } else {
                [character] = `${dictionary.items[review[i] - 1].character[0]}${dictionary.items[review[i] - 1].character[1]}`;
            }

            $('#cha').append($(`<span class="character">${character}。</span>`));
        }

        for (let i = 0; i < learn.length; i += 1) {
            if (dictionary.items[learn[i] - 1].character.length === 1) {
                [character] = dictionary.items[learn[i] - 1].character;
            } else {
                [character] = `${dictionary.items[learn[i] - 1].character[0]}${dictionary.items[learn[i] - 1].character[1]}`;
            }

            $('#cha').append($(`<span class="character">${character}。</span>`));
        }

        for (let i = 0; i < size; i += 1) {
            if (dictionary.items[i].character.length === 1) {
                [character] = dictionary.items[i].character;
            } else {
                [character] = `${dictionary.items[i].character[0]}${dictionary.items[i].character[1]}`;
            }

            $('#list').append($(`<span class="character">${character}。</span>`));
        }
    }

    function watcher() {
        $('.flashcard__flip-switch').on('click', () => {
            if ($('.flashcard').hasClass('flashcard--flip')) {
                $('.flashcard').removeClass('flashcard--flip');
            } else {
                $('.flashcard').addClass('flashcard--flip');
            }
        });

        $('.flashcard__back--top-side').on('click', () => {
            writerBack.hideCharacter();

            if (dictionary.items[sequence[currentCard]].character.length !== 1) {
                writerBack2.hideCharacter();

                writerBack.animateCharacter({
                    onComplete: () => {
                        setTimeout(() => {
                            writerBack2.animateCharacter();
                        }, 500);
                    }
                });
            } else {
                writerBack.animateCharacter();
            }
        });

        $('#lesson').on('change', () => {
            /* console.log('select used'); */

            if (($('#lesson option:selected').val() * 1) === -1) {
                $('#dialogue-choice').hide();
            } else if (($('#lesson option:selected').val() * 1) === 0) {
                $('#lesson-0').show();
                $('#lessons').hide();
                $('#dialogue-choice').show();
            } else {
                $('#dialogue-choice').show();
                $('#lessons').show();
                $('#lesson-0').hide();
            }
        });

        $('#update').on('click', (e) => {
            e.preventDefault();

            currentCard = 0;
            lesson      = $('#lesson option:selected').val() * 1;

            if (lesson === 0) {
                const value = $('input[name=dialogue-0]:checked').val();
                dialogue = value === 'all' ? value : $('input[name=dialogue-0]:checked').val() * 1;
            } else {
                const value = $('input[name=dialogue]:checked').val();
                dialogue = value === 'all' ? value : $('input[name=dialogue]:checked').val() * 1;
            }

            /* console.log('lesson', typeof lesson); */
            /* console.log('dialogue', dialogue); */

            sequence    = sequenceGenerator($('input[name=cardsOrder]:checked', '.flashcard__order').val() === 'random');
            cardSize    = sequence.length;

            /* console.log('possibleSequence', sequence); */

            /* console.log(cardSize); */

            /* console.log('lesson:' + lesson + ' dialogue: ' + dialogue); */
            getCard(sequence[currentCard]);
            listing();
        });

        $('.next').click((e) => {
            e.preventDefault();

            if (currentCard < cardSize - 1) {
                currentCard += 1;
                getCard(sequence[currentCard]);
            }
        });

        $('.prev').click((e) => {
            e.preventDefault();

            if (currentCard > 0) {
                currentCard -= 1;
                getCard(sequence[currentCard]);
            }
        });
    }

    $.getJSON(url, (data) => {
        dictionary = data;
        sequence   = sequenceGenerator(false);
        cardSize   = sequence.length;

        if (($('#lesson option:selected').val() * 1) === 0) {
            $('#lesson-0').show();
            $('#lessons').hide();
        } else {
            $('#lessons').show();
            $('#lesson-0').hide();
        }

        setup();
        watcher();
    });
});
