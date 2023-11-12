// SPDX-License-Identifier: MIT OR Apache-2.0
//---------------------------------------------------------------------------//
// Copyright (c) 2021 Mikhail Komarov <nemo@nil.foundation>
// Copyright (c) 2021 Ilias Khairullin <ilias@nil.foundation>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//---------------------------------------------------------------------------//

pragma solidity >=0.8.4;

import '../../../contracts/algebra/field.sol';

contract TestFieldMath {
    function test_log2_ceil() public {
        uint256 i = 1;
        require(0 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(10 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(11 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(12 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(12 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(13 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(13 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(13 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(13 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(14 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 ==  field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(15 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(16 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
        require(17 == field.log2(i), "Log2 result is not correct");
        i += 1000;
    }
}
