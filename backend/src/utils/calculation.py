from math import exp

from src.utils.constants import *


class Calculation:

    @staticmethod
    def calculation_1():

        for i in range(0, Nx + 1):
            for j in range(0, Ny + 1):
                for k in range(0, Nz + 1):
                    F[i, j, k] = exp(dx**2 * (Nx / 2 - i) * (i - Nx / 2)) * exp(
                        dy**2 * (Ny / 2 - j) * (j - Ny / 2)
                    ) * exp(-dz * k) * dt * ntime * exp(-beta * dt * ntime)

        for i in range(1, Nx):
            for j in range(1, Ny):
                for k in range(1, Nz):
                    tmpe1[i, j, k] = tmpe0[i, j, k] * dt * a1 * (
                        (tmpe0[i+1, j, k] + tmpe0[i-1, j, k] - 2 * tmpe0[i, j, k]) / dx**2 +
                        (tmpe0[i, j+1, k] + tmpe0[i, j-1, k] - 2 * tmpe0[i, j, k]) / dy**2 + a2 *
                        (tmpe0[i, j, k+1] + tmpe0[i, j, k-1] - 2 * tmpe0[i, j, k]) / dz**2
                    ) + dt + b1 * F[i, j, k] + dt * cc1 * (tmpi0[i, j, k] - tmpe0[i, j, k])

                    tmpi1[i, j, k] = tmpi0[i, j, k] + dt * cc2 * (tmpe0[i, j, k] - tmpi0[i, j, k])

    @staticmethod
    def calculation_2():
        pass
