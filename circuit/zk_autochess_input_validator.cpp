#include <nil/crypto3/hash/algorithm/hash.hpp>
#include <nil/crypto3/hash/poseidon.hpp>

using namespace nil::crypto3;
using namespace nil::crypto3::algebra::curves;

#define BOARD_SIZE 8

using field = pallas::base_field_type::value_type;

[[circuit]] typename pallas::base_field_type::value_type
    verify_input(field nonce, field player, std::array<std::array<field, BOARD_SIZE>, BOARD_SIZE / 2> input) {
    typename pallas::base_field_type::value_type hash_result = hash<hashes::poseidon>(nonce, player);
    bool result = true;
    unsigned count = 0;
    for (unsigned i = 0; i < BOARD_SIZE / 2; ++i) {
        for (unsigned j = 0; j < BOARD_SIZE; ++j) {
            bool my_unit = input[i][j] == player;
            result = result && (input[i][j] == 0 || my_unit);
            if (my_unit) {
                count++;
            }
            hash_result = hash<hashes::poseidon>(hash_result, input[i][j]);
        }
    }
    __builtin_assigner_exit_check(result);
    __builtin_assigner_exit_check(count < 5);

    return hash_result;
}
