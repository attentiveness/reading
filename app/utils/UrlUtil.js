/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const getUrl = (url) => {
  if (url.indexOf('?') === -1) {
    return `${url}?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`;
  }
  return `${url}&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`;
};

export default getUrl;
