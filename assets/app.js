/*
 * Knitted Knockers bra-size lookup
 *
 * Source: Knitted Knockers bra sizing chart shared by the organization.
 * The chart explicitly maps US and UK bra sizes to an underwire size and cup diameter.
 *
 * Important: this app intentionally does NOT extrapolate beyond the chart,
 * convert other international sizing systems, or add pattern rows.
 */

const DIAMETER_BY_UNDERWIRE = {
  30: { cm: 9.7, inches: '3 5/6″' },
  32: { cm: 10.6, inches: '4 1/6″' },
  34: { cm: 11.4, inches: '4 1/2″' },
  36: { cm: 12.3, inches: '4 5/6″' },
  38: { cm: 13.1, inches: '5 1/6″' },
  40: { cm: 14.0, inches: '5 1/2″' },
  42: { cm: 14.8, inches: '5 5/6″' },
  44: { cm: 15.7, inches: '6 1/6″' },
  46: { cm: 16.5, inches: '6 1/2″' },
  48: { cm: 17.4, inches: '6 5/6″' },
  50: { cm: 18.2, inches: '7 1/6″' },
  52: { cm: 19.0, inches: '7 1/2″' },
  54: { cm: 19.9, inches: '7 5/6″' },
  56: { cm: 20.7, inches: '8 1/6″' },
  58: { cm: 21.6, inches: '8 1/2″' },
  60: { cm: 22.4, inches: '8 5/6″' }
};

const US_BY_UNDERWIRE = {
  30: ['32A','30B','28C'],
  32: ['34A','32B','30C','28D'],
  34: ['36A','34B','32C','30D','28E'],
  36: ['38A','36B','34C','32D','30E','28F'],
  38: ['40A','38B','36C','34D','32E','30F','28G'],
  40: ['42A','40B','38C','36D','34E','32F','30G','28H'],
  42: ['44A','42B','40C','38D','36E','34F','32G','30H','28I'],
  44: ['44B','42C','40D','38E','36F','34G','32H','30I','28J'],
  46: ['44C','42D','40E','38F','36G','34H','32I','30J','28K'],
  48: ['44D','42E','40F','38G','36H','34I','32J','30K','28L'],
  50: ['44E','42F','40G','38H','36I','34J','32K','30L','28M'],
  52: ['44F','42G','40H','38I','36J','34K','32L','30M','28N'],
  54: ['44G','42H','40I','38J','36K','34L','32M','30N','28O'],
  56: ['44H','42I','40J','38K','36L','34M','32N','30O','28P'],
  58: ['44I','42J','40K','38L','36M','34N','32O','30P'],
  60: ['44J','42K','40L','38M','36N','34O','32P']
};

const UK_BY_UNDERWIRE = {
  30: ['32A','30B','28C'],
  32: ['34A','32B','30C','28D'],
  34: ['36A','34B','32C','30D','28DD'],
  36: ['38A','36B','34C','32D','30DD','28E'],
  38: ['40A','38B','36C','34D','32DD','30E','28F'],
  40: ['42A','40B','38C','36D','34DD','32E','30F','28FF'],
  42: ['44A','42B','40C','38D','36DD','34E','32F','30FF','28G'],
  44: ['44B','42C','40D','38DD','36E','34F','32FF','30G','28GG'],
  46: ['44C','42D','40DD','38E','36F','34FF','32G','30GG','28H'],
  48: ['44D','42DD','40E','38F','36FF','34G','32GG','30H','28HH'],
  50: ['44DD','42E','40F','38FF','36G','34GG','32H','30HH','28J'],
  52: ['44E','42F','40FF','38G','36GG','34H','32HH','30J','28JJ'],
  54: ['44F','42FF','40G','38GG','36H','34HH','32J','30JJ','28K'],
  56: ['44FF','42G','40GG','38H','36HH','34J','32JJ','30K','28KK'],
  58: ['44G','42GG','40H','38HH','36J','34JJ','32K','30KK'],
  60: ['44GG','42H','40HH','38J','36JJ','34K','32KK']
};

function buildLookup(rows) {
  const lookup = {};
  for (const [underwire, sizes] of Object.entries(rows)) {
    for (const size of sizes) lookup[size] = Number(underwire);
  }
  return lookup;
}

const SIZE_LOOKUP = {
  US: buildLookup(US_BY_UNDERWIRE),
  UK: buildLookup(UK_BY_UNDERWIRE)
};

function normalizeSize(value) {
  return (value || '').toUpperCase().replace(/\s+/g, '').trim();
}

function contactHQMessage() {
  return 'That size is not listed on the Knitted Knockers sizing chart used by this tool. ' +
    'Please <a href="https://www.knittedknockers.org/contact-us/" target="_blank" rel="noopener">contact Knitted Knockers headquarters</a> for sizing guidance rather than estimating.';
}

function recommend(region, input) {
  const size = normalizeSize(input);
  if (!/^\d{2}[A-Z]{1,2}$/.test(size)) {
    return { error: 'Enter a bra size exactly as written, for example 38D, 44F, or 34FF.' };
  }

  const lookup = SIZE_LOOKUP[region];
  if (!lookup) return { error: 'Select US or UK sizing.' };

  const underwire = lookup[size];
  if (!underwire) return { error: contactHQMessage() };

  const diameter = DIAMETER_BY_UNDERWIRE[underwire];
  return { size, underwire, ...diameter };
}

function handleCalculate(region, size) {
  return recommend(region, size);
}
window.handleCalculate = handleCalculate;

const $ = selector => document.querySelector(selector);

$('#calcBtn').addEventListener('click', () => {
  const out = $('#out');
  const res = handleCalculate($('#region').value, $('#bra').value);

  if (res.error) {
    out.innerHTML = '<span style="color:#b00020;font-weight:700">' + res.error + '</span>';
    return;
  }

  out.innerHTML =
    'Target finished diameter: <strong>' + res.inches + '</strong> (' + res.cm.toFixed(1) + ' cm)';
});

$('#bra').addEventListener('keydown', event => {
  if (event.key === 'Enter') $('#calcBtn').click();
});

$('#resetBtn').addEventListener('click', () => {
  $('#bra').value = '';
  $('#out').textContent = '—';
  $('#bra').focus();
});
