#include <nil/crypto3/algebra/curves/pallas.hpp>

#define MAX_ROUND 50
#define BOARD_SIZE 8
#define DOES_UNIT_HIT(to_hit, player)                     \
    if (is_empty(to_hit) || is_my_unit(to_hit, player)) { \
        did_hit |= false;                                 \
    } else {                                              \
        to_hit.hp -= 20;                                  \
        did_hit |= true;                                  \
    }

struct __attribute__((packed)) Unit {
    unsigned type;
    // TODO move to signed
    unsigned hp;
};

struct __attribute__((packed)) Board {
    Unit val[BOARD_SIZE + 2][BOARD_SIZE + 2];
};

bool is_my_unit(Unit &unit, unsigned player) {
    return unit.type == player;
}

bool is_empty(Unit &unit) {
    return unit.type == 0;
}

Unit empty_unit() {
    return Unit {0, 0};
}

Unit get_unit(unsigned unit_type) {
    if (unit_type == 0) {
        return empty_unit();
    } else {
        return Unit {unit_type, 100};
    }
}

void transition_player_one(Board &board) {
    for (unsigned i = BOARD_SIZE; i > 0; --i) {
        for (unsigned j = BOARD_SIZE; j > 0; --j) {
            if (is_my_unit(board.val[i][j], 1) && is_empty(board.val[i + 1][j]) && i != BOARD_SIZE) {
                board.val[i + 1][j] = board.val[i][j];
                board.val[i][j] = empty_unit();
            }
        }
    }
}

void transition_player_two(Board &board) {
    for (unsigned i = 1; i <= BOARD_SIZE; ++i) {
        for (unsigned j = 1; j <= BOARD_SIZE; ++j) {
            if (is_my_unit(board.val[i][j], 2) && is_empty(board.val[i - 1][j]) && i != 1) {
                board.val[i - 1][j] = board.val[i][j];
                board.val[i][j] = empty_unit();
            }
        }
    }
}

void hit_unit(Unit &to_hit, unsigned player) {
    if (!is_empty(to_hit) && !is_my_unit(to_hit, player)) {
        if (to_hit.hp < 20) {
            to_hit.hp = 0;
        } else {
            to_hit.hp -= 20;
        }
    }
}

bool is_dead(Unit &unit) {
    return unit.type && unit.hp == 0;
}

void kill_dead_units(Board &board) {
    for (unsigned i = 1; i <= BOARD_SIZE; ++i) {
        for (unsigned j = 1; j <= BOARD_SIZE; ++j) {
            if (is_dead(board.val[i][j])) {
                board.val[i][j] = empty_unit();
            }
        }
    }
}

void all_units_hit(Board &board) {
    bool did_hit = false;
    // hit player one
    for (unsigned i = 1; i <= BOARD_SIZE; ++i) {
        for (unsigned j = 1; j <= BOARD_SIZE; ++j) {
            if (is_my_unit(board.val[i][j], 1)) {
                // hit all 5 fields explicitly
                DOES_UNIT_HIT(board.val[i][j - 1], 1);
                DOES_UNIT_HIT(board.val[i][j + 1], 1);
                DOES_UNIT_HIT(board.val[i + 1][j - 1], 1);
                DOES_UNIT_HIT(board.val[i + 1][j], 1);
                DOES_UNIT_HIT(board.val[i + 1][j + 1], 1);
            }
        }
    }
    // hit player two
    for (unsigned i = 1; i <= BOARD_SIZE; ++i) {
        for (unsigned j = 1; j <= BOARD_SIZE; ++j) {
            if (is_my_unit(board.val[i][j], 2)) {
                // hit all 5 fields explicitly
                DOES_UNIT_HIT(board.val[i][j + 1], 2);
                DOES_UNIT_HIT(board.val[i][j - 1], 2);
                DOES_UNIT_HIT(board.val[i - 1][j + 1], 2);
                DOES_UNIT_HIT(board.val[i - 1][j], 2);
                DOES_UNIT_HIT(board.val[i - 1][j - 1], 2);
            }
        }
    }
}

unsigned check_winner(Board &board) {
    unsigned survivors_player_one = 0;
    unsigned survivors_player_two = 0;
    for (unsigned i = 1; i <= BOARD_SIZE; ++i) {
        for (unsigned j = 1; j <= BOARD_SIZE; ++j) {
            if (board.val[i][j].type == 1) {
                survivors_player_one++;
            } else if (board.val[i][j].type == 2) {
                survivors_player_two++;
            }
        }
    }
    if (survivors_player_one == survivors_player_two) {
        return 0;
    } else if (survivors_player_one > survivors_player_two) {
        return 1;
    } else {
        return 2;
    }
}

[[circuit]] unsigned run_game(std::array<std::array<unsigned, BOARD_SIZE>, BOARD_SIZE / 2> player_one,
                              std::array<std::array<unsigned, BOARD_SIZE>, BOARD_SIZE / 2>
                                  player_two) {

    Board board;
    // set everything to zero
    for (unsigned i = 0; i < BOARD_SIZE + 2; ++i) {
        for (unsigned j = 0; j < BOARD_SIZE + 2; ++j) {
            board.val[i][j] = empty_unit();
        }
    }

    // setup player one
    for (unsigned i = 0; i < BOARD_SIZE / 2; ++i) {
        for (unsigned j = 0; j < BOARD_SIZE; ++j) {
            board.val[i + 1][j + 1] = get_unit(player_one[i][j]);
        }
    }
    // setup player two
    for (unsigned i = BOARD_SIZE / 2; i < BOARD_SIZE; ++i) {
        for (unsigned j = 0; j < BOARD_SIZE; ++j) {
            board.val[i + 1][j + 1] = get_unit(player_two[i - (BOARD_SIZE / 2)][j]);
        }
    }

    // bool another_round = true;
    // game logic
    for (unsigned i = 0; i < MAX_ROUND; ++i) {
        transition_player_one(board);
        transition_player_two(board);
        all_units_hit(board);
        kill_dead_units(board);
    }
    return check_winner(board);
}
