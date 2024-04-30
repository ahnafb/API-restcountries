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
                var languages = Object.values(countryInfo.languages).join(', '); // Mengonversi objek languages menjadi daftar bahasa
                var countryDetails = `
                <div id="countryDetails" class="p-8 mt-6 border rounded-lg shadow-lg">
                <h2 class="text-3xl font-medium text-white mb-4">${countryInfo.name.common} (${countryInfo.name.official}) ${countryInfo.flag}</h2>
                <div class="grid grid-cols-2 gap-4 text-white">
                    <div>
                        <p class="font-medium">Capital:</p>
                        <p class="text-lg" id="capital">${countryInfo.capital}</p>
                    </div>
                    <div>
                        <p class="font-medium">Languages:</p>
                        <p class="text-lg" id="languages">${languages}</p>
                    </div>
                    <div>
                        <p class="font-medium">Population:</p>
                        <p class="text-lg" id="population">${countryInfo.population}</p>
                    </div>
                    <div>
                        <p class="font-medium">Region:</p>
                        <p class="text-lg" id="region">${countryInfo.region}</p>
                    </div>
                    <div>
                        <p class="font-medium">Subregion:</p>
                        <p class="text-lg" id="subregion">${countryInfo.subregion}</p>
                    </div>
                </div>
                more
                </div>
                `;
                $('#countryDetails').html(countryDetails);

                // Scroll to country details
                var offset = $('#countryDetails').offset().top;
                $('html, body').animate({
                    scrollTop: offset
                }, 500);
            },
            error: function (xhr, status, error) {
                $('#countryDetails').text('Error fetching country information. Please try again.');
                console.error(xhr.responseText);
            }
        });
    });
});