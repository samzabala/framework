import FwDataHelper from './../classes/data-helper.js';
import {
  DateTimePreset,
  dayNames,
  dayNamesShort,
  monthNames,
  monthNamesShort,
} from './../util/validation';

class FwDate extends FwDataHelper {
  static toParsed(d) {
    if (d) {
      let yr,
        mo,
        dy,
        hr,
        mn,
        dateArr = [],
        timeArr = [];

      if (Object.prototype.toString.call(d) === '[object Date]') {
        //make a new date out of its methods because js will think u are referring to the same date everythere and ur math becomes a hellhole... dont.. hOE
        yr = d.getFullYear() || null;
        mo = d.getMonth() || null;
        dy = d.getDate() || null;
        hr = d.getHours() || null;
        mn = d.getMinutes() || null;
      } else {
        const pattern = new RegExp(DateTimePreset.Value.pattern);
        const isValid = pattern.test(d);

        if (isValid) {
          let DateTimePresetArr = d.split('T') || [];

          //date
          if (DateTimePresetArr[0]) {
            dateArr = DateTimePresetArr[0].split('-');
          }

          //time
          if (DateTimePresetArr[1]) {
            timeArr = DateTimePresetArr[1].split(':');
          }

          yr = parseInt(dateArr[0]) || null;
          mo = parseInt(dateArr[1] - 1) || null;
          dy = parseInt(dateArr[2]) || null;
          hr = parseInt(timeArr[0]) || null;
          mn = parseInt(timeArr[1]) || null;
        }
      }

      let toReturn = false;

      if (
        Object.prototype.toString.call(new Date(yr, mo, dy, hr, mn)) == '[object Date]'
      ) {
        toReturn = new Date(yr, mo, dy, hr, mn);
      }

      return toReturn;
    }
  }

  static toHuman(date, format) {
    const d = FwDate.toParsed(date);
    format = format || DateTimePreset.HumanDate.template;

    if (d) {
      let iFormat,
        output = '',
        literal = false;

      // Check whether a format character is doubled
      const lookAhead = (match) => {
          let matches =
            iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        },
        // Format a number, with leading zero if necessary
        formatNumber = (match, value, len) => {
          let num = '' + value;
          if (lookAhead(match)) {
            while (num.length < len) {
              num = '0' + num;
            }
          }
          return num;
        },
        // Format a name, short or long as requested
        formatName = (match, value, shortNames, longNames) => {
          return lookAhead(match) ? longNames[value] : shortNames[value];
        };

      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd': //date number
              output += formatNumber('d', d.getDate(), 2);
              break;

            case 'D': //day of the week
              output += formatName('D', d.getDay(), dayNamesShort, dayNames);
              break;

            case 'o': //day of year hmm
              output += formatNumber(
                'o',
                Math.round(
                  (new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() -
                    new Date(d.getFullYear(), 0, 0).getTime()) /
                    86400000
                ),
                3
              );
              break;

            case 'm': //month
              output += formatNumber('m', d.getMonth() + 1, 2);
              break;

            case 'M': //month but name
              output += formatName('M', d.getMonth(), monthNamesShort, monthNames);
              break;

            case 'y': //year
              output += lookAhead('y')
                ? d.getFullYear()
                : (d.getFullYear() % 100 < 10 ? '0' : '') + (d.getFullYear() % 100);
              break;

            case 'H': //12 hour
              output += formatNumber('H', d.getHours() % 12 || 12, 2);
              break;

            case 'h': //24 hour
              output += formatNumber('h', d.getHours(), 2);
              break;

            case 'i': //minute
              output += formatNumber('i', d.getMinutes(), 2);
              break;

            case 'a': //am /pm
              output += d.getHours() >= 12 ? 'pm' : 'am';
              break;

            case 'A': //AM/PM
              output += d.getHours() >= 12 ? 'PM' : 'AM';
              break;

            case "'":
              if (lookAhead("'")) {
                output += "'";
              } else {
                literal = true;
              }
              break;

            default:
              output += format.charAt(iFormat);
          }
        }
      }

      return output;
    } else {
      return false;
    }
  }

  static toVal(date) {
    const d = FwDate.toParsed(date);

    if (d) {
      return this.toHuman(d, DateTimePreset.Value.template);
    }
  }

  static adjacentMonth(date, offsetByMonth, dateOverride) {
    let d = FwDate.toParsed(date);

    if (d) {
      dateOverride = dateOverride || null;

      const currMonth = d.getMonth(),
        currYear = d.getFullYear(),
        newMonth = (() => {
          let toReturn;
          if ((currMonth + offsetByMonth) % 12 > 12) {
            toReturn = ((currMonth + offsetByMonth) % 12) - 12;
          } else if ((currMonth + offsetByMonth) % 12 < 0) {
            toReturn = ((currMonth + offsetByMonth) % 12) + 12;
          } else {
            toReturn = (currMonth + offsetByMonth) % 12;
          }

          return toReturn;
        })(),
        newYear = (() => {
          const defOffset = parseInt(offsetByMonth / 12);
          let toReturn = currYear + defOffset;

          //offset to adjacent year
          if (offsetByMonth < 0 && currMonth + (offsetByMonth % 12) < 0) {
            toReturn -= 1;
          } else if (offsetByMonth > 0 && currMonth + (offsetByMonth % 12) > 11) {
            toReturn += 1;
          }

          return toReturn;
        })();
      d.setMonth(newMonth);
      d.setFullYear(newYear);

      if (dateOverride) {
        d.setDate(dateOverride);
      }

      return d;
    } else {
      return false;
    }
  }
}

export default FwDate;
