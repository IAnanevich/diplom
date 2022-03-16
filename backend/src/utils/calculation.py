from src.utils.services import ConditionEvaluation, VariableEvaluation

from src.utils.constants import *


class MainCalculation(ConditionEvaluation, VariableEvaluation):

    # TODO: add conditions calculation
    def calculation(self, dt, t, fl):
        for i in range(1, N - 1):
            self.te2[i] = self.te1[i] + dt / self.calc_electronic_heat_capacity(self.te1[i]) * (
                        Ke * (self.te1[i + 1] - 2 * self.te1[i] + self.te1[i - 1]) / dx / dx - g * (
                            self.te1[i] - self.tl1[i]) + self.calc_power_source(self.x, self.x[i], t, fl))

            self.tl2[i] = self.tl1[i] + dt / Cl * (
                        Kl * (self.tl1[i + 1] - 2 * self.tl1[i] + self.tl1[i - 1]) / dx / dx + g * (
                            self.te1[i] - self.tl1[i]))

            yield self.te2, self.tl2
