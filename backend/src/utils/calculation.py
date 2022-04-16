# from math import exp

from src.utils.constants import *
# from conditions import *

# import matplotlib.pyplot as plt


class Calculation:

    @staticmethod
    def calculation_1(time):
        def calculation1(time):
            F[:, :, :] = fe * time * np.exp(-beta * time)

            tmpe1[1:nx, 1:ny, 1:nz] = tmpe0[1:nx, 1:ny, 1:nz] + dt * a1 * (
                    (tmpe0[2:, 1:ny, 1:nz] + tmpe0[:nx - 1, 1:ny, 1:nz] - 2 * tmpe0[1:nx, 1:ny, 1:nz]) / dx ** 2 + \
                    (tmpe0[1:nx, 2:, 1:nz] + tmpe0[1:nx, :ny - 1, 1:nz] - 2 * tmpe0[1:nx, 1:ny, 1:nz]) / dy ** 2 + a2 * \
                    (tmpe0[1:nx, 1:ny, 2:] + tmpe0[1:nx, 1:ny, :nz - 1] - 2 * tmpe0[1:nx, 1:ny, 1:nz]) / dz ** 2
            ) + dt * b1 * F[1:nx, 1:ny, 1:nz] + dt * cc1 * (tmpi0[1:nx, 1:ny, 1:nz] - tmpe0[1:nx, 1:ny, 1:nz])

            tmpi1[1:nx, 1:ny, 1:nz] = tmpi0[1:nx, 1:ny, 1:nz] - dt * cc2 * (
                        tmpi0[1:nx, 1:ny, 1:nz] - tmpe0[1:nx, 1:ny, 1:nz])

            tmpe1[:, :, nz] = init_val
            tmpi1[:, :, nz] = init_val

            tmpe1[:, :, 0] = tmpe1[:, :, 1]
            tmpi1[:, :, 0] = tmpi1[:, :, 1]

            tmpe1[0] = tmpe1[1]
            tmpi1[0] = tmpi1[1]

            tmpe1[nx] = tmpe1[nx - 1]
            tmpi1[nx] = tmpi1[nx - 1]

            tmpe1[:, 0] = tmpe1[:, 1]
            tmpi1[:, 0] = tmpi1[:, 1]

            tmpe1[:, ny] = tmpe1[:, ny - 1]
            tmpi1[:, ny] = tmpi1[:, ny - 1]

    @staticmethod
    def calculation_2(time):
        F[:, :, :] = fe * time * np.exp(-beta * time)

        tmpe2[1:nx, 1:ny, 1:nz] = tmpe0[1:nx, 1:ny, 1:nz] * a1 * dt * (
                    1 / a1 / dt - 2 / dx ** 2 - 2 / dy ** 2 - 2 * a2 / dz ** 2) + \
                                  2 * dt * a1 * (
                                          (tmpe1[2:, 1:ny, 1:nz] + tmpe1[:nx - 1, 1:ny, 1:nz]) / dx ** 2 + \
                                          (tmpe1[1:nx, 2:, 1:nz] + tmpe1[1:nx, :ny - 1, 1:nz]) / dy ** 2 + a2 * \
                                          (tmpe1[1:nx, 1:ny, 2:] + tmpe1[1:nx, 1:ny, :nz - 1]) / dz ** 2
                                  ) + 2 * dt * b1 * F[1:nx, 1:ny, 1:nz] + 2 * dt * cc1 * (
                                              tmpi1[1:nx, 1:ny, 1:nz] - tmpe1[1:nx, 1:ny, 1:nz])

        tmpe2[1:nx, 1:ny, 1:nz] /= a1 * dt * (1 / a1 / dt + 2 / dx ** 2 + 2 / dy ** 2 + 2 * a2 / dz ** 2)

        tmpi2[1:nx, 1:ny, 1:nz] = tmpi1[1:nx, 1:ny, 1:nz] - dt * cc2 * (
                    tmpi1[1:nx, 1:ny, 1:nz] - tmpe1[1:nx, 1:ny, 1:nz])

        tmpe2[:, :, nz] = init_val
        tmpi2[:, :, nz] = init_val

        tmpe2[:, :, 0] = tmpe2[:, :, 1]
        tmpi2[:, :, 0] = tmpi2[:, :, 1]

        tmpe2[0] = tmpe2[1]
        tmpi2[0] = tmpi2[1]

        tmpe2[nx] = tmpe2[nx - 1]
        tmpi2[nx] = tmpi2[nx - 1]

        tmpe2[:, 0] = tmpe2[:, 1]
        tmpi2[:, 0] = tmpi2[:, 1]

        tmpe2[:, ny] = tmpe2[:, ny - 1]
        tmpi2[:, ny] = tmpi2[:, ny - 1]

    @classmethod
    def calculation(cls, time):
        cls.calculation_1(time)

        cls.calculation_2(time)
