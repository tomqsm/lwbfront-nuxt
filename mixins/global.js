export default {
  methods: {
    lwbDateGenetivus(date, data) {
      const locale = data.$i18n.locale
      console.log('locale')
      console.log(locale)
      const monthsGenetivus = {
        en: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        pl: [
          'stycznia',
          'lutego',
          'marca',
          'kwietnia',
          'maja',
          'czerwca',
          'lipca',
          'sierpnia',
          'września',
          'października',
          'listopada',
          'grudnia'
        ]
      }

      const localiseMonths = (locale) => {
        return monthsGenetivus[locale]
      }

      const formatDate = (inputDate, months) => {
        const date = new Date(inputDate)
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        return day + ' ' + months[month] + ' ' + year
      }

      return formatDate(date, localiseMonths(locale))
    }
  }
}
