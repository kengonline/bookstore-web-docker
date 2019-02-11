import moment from 'moment-timezone';
import EnvConfig from 'src/configs/env.config'
import 'moment/locale/th'

moment.tz.setDefault(EnvConfig.TIMEZONE);
moment.locale(EnvConfig.DEFAULT_LOCALE)