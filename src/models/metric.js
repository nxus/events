/* 
* @Author: Mike Reich
* @Date:   2016-02-14 08:50:18
* @Last Modified 2016-02-14
*/

'use strict';

import {BaseModel} from '@nxus/storage'

export default BaseModel.extend({
  identity: 'metric',
  connection: 'default',
  attributes: {
    name: 'string',
    data: 'json'
  }
});


