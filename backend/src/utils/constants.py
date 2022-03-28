import numpy as np


Nx = 50
Ny = 50
Nz = 200

dt = 1e-4
dx = 0.1
dy = 0.1
dz = 0.2

tt = 0.0
ntime = 0.0

# variable for initial conditions
init_var = 1e-16

# TODO: from frontend
r0 = 1  # - radius of light beam, cm
kabs = 1  # - ansorption coeff, cm-1
P0 = 1  # - intensity, W/cm2
tp = 1  # - pulse duration, s
# ------------------------------------------

# heat cond electron, W/cmK
kte = 3.115

# electron density, g/cm3
roe = 4.56e-5

# electron heat capacity
Ce = 1.2e+3

# ion density, g/cm3
roi = 19.32

# ion heat capacity, J/gK
Ci = 0.132

# char temperature, K
T00 = 300.0

# velocity of sound, cm/s
u0 = 3.24e+5

# gamma el-phonon, W/cm3K
gamma = 0.25e+11

F = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)
tmpe0 = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)
tmpe1 = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)
tmpe2 = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)
tmpi0 = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)
tmpi1 = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)
tmpi2 = np.empty((Nx + 1, Ny + 1, Nz + 1), dtype=float)

# char time, s
t0 = 1 / (kabs * u0)

# parameter of pulse
beta = t0 / tp

a1 = kte * t0 / (roe * Ce * r0**2)
a2 = kabs**2 * r0**2
b1 = kabs * P0 * t0 * beta / (roe * Ce * T00)
cc1 = gamma * t0 / (roe * Ce)
cc2 = gamma * t0 / (roi * Ci)
