$(document).ready(function () {
    // Load country list on page load
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        type: 'GET',
        success: function (data) {
            var countryList = '';
            data.forEach(function (country) {
            countryList += `<div class="countryItem" data-country="${country.name.common}"> <img class="img-logo" src="${country.flags.png}" alt="Flag"> &nbsp ${country.name.common}</div>`;
            });
            $('#countryList').html(countryList);
        },
        error: function (xhr, status, error) {
            $('#countryList').text('Error fetching country list. Please try again.');
            console.error(xhr.responseText);
        }
    });

    // Event listener for clicking on country item
    $(document).on('click', '.countryItem', function () {
        var countryName = $(this).data('country');
        $.ajax({
            url: `https://restcountries.com/v3.1/name/${countryName}`,
            type: 'GET',
            success: function (data) {
                var countryInfo = data[0];
                var countryDetails = `
                    <h2 class="text-xl font-medium mb-2">${countryInfo.name.common}</h2>
                    <p>Capital: ${countryInfo.capital}</p>
                    <p>Population: ${countryInfo.population}</p>
                    <p>Region: ${countryInfo.region}</p>
                    <p>Subregion: ${countryInfo.subregion}</p>
                `;
                $('#countryDetails').html(countryDetails);

                // Scroll to country details
                var offset = $('#countryDetails').offset().top;
                $('html, body').animate({
                    scrollTop: offset
                }, 1000);
            },
            error: function (xhr, status, error) {
                $('#countryDetails').text('Error fetching country information. Please try again.');
                console.error(xhr.responseText);
            }
        });
    });
});