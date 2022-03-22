import math

from src.utils.constants import *


class VariableEvaluation:

    @staticmethod
    def calc_light_intensity(t, fl):
        return fl / tp * math.sqrt(math.log(2) / math.pi) * math.exp(
            -4 * math.log(2) * math.pow((t - 2 * tp) / tp, 2)
        )

    @staticmethod
    def calc_s(x, _x):
        x0 = x[N // 2]
        return (1 - R) * alpha * math.exp(-_x * alpha - (2 * math.pow(_x - x0, 2)) / (w0 ** 2))

    @classmethod
    def calc_power_source(cls, x, _x, t, fl):
        return cls.calc_light_intensity(t, fl) * cls.calc_s(x, _x)

    @staticmethod
    def calc_electronic_heat_capacity(te):
        return Ae * te


class ConditionEvaluation:

    def __init__(self, te1, te2, tl1, tl2, x):
        self.te1 = te1
        self.te2 = te2
        self.tl1 = tl1
        self.tl2 = tl2
        self.x = x

    def initial_condition(self, t0):
        for i in range(t0):
            self.te1[i] = t0
            self.te2[i] = t0

            self.tl1[i] = t0
            self.tl2[i] = t0

    def boundary_condition(self):
        for i in range(N):
            self.te2[0] = self.te2[1]
            self.te2[N - 1] = self.te2[N - 2]

            self.tl2[0] = self.tl2[1]
            self.tl2[N - 1] = self.tl2[N - 2]
