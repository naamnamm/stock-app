const companyData = {
  company: {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    exchange: 'NASDAQ',
    industry: 'Telecommunications Equipment',
    website: 'http://www.apple.com',
    description:
      'Apple, Inc. engages in the design, manufacture, and marketing of mobile communication, media devices, personal computers, and portable digital music players. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak on April 1, 1976 and is headquartered in Cupertino, CA.',
    CEO: 'Timothy Donald Cook',
    securityName: 'Apple Inc.',
    issueType: 'cs',
    sector: 'Electronic Technology',
    primarySicCode: 3663,
    employees: 132000,
    tags: ['Electronic Technology', 'Telecommunications Equipment'],
    address: 'One Apple Park Way',
    address2: null,
    state: 'CA',
    city: 'Cupertino',
    zip: '95014-2083',
    country: 'US',
    phone: '1.408.974.3123',
  },
};

//https://iexcloud.io/core-data-catalog/
//logo
//https://iexcloud.io/docs/api/#logo
//https://iexcloud.io/docs/api/#company
//https://iexcloud.io/docs/api/#quote

//https://iexcloud.io/docs/api/#historical-prices
//https://iexcloud.io/docs/api/#dividends-basic
//https://sandbox.iexapis.com/stable/stock/twtr/chart/dynamic?token=Tsk_66820f5895ad4695ba96beee7925717b

module.exports = companyData;
