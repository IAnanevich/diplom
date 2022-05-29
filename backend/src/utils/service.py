from src.utils.constants import u0, kte, roe, Ce, T00, gamma, roi, Ci


class MainCalculationService:
    f_r0 = lambda value: value * 10 ** -2  # - radius of light beam, cm
    f_kabs = lambda value: value * 10 ** 5  # - ansorption coeff, cm-1
    f_P0 = lambda value: value * 10 ** 8  # - intensity, W/cm2
    f_tp = lambda value: value * 10 ** -13  # - pulse duration, s

    @classmethod
    def r0(cls, data: dict) -> float:
        return cls.f_r0(value=data.get('r0'))

    @classmethod
    def tp(cls, data: dict) -> float:
        return cls.f_tp(value=data.get('tp'))

    @classmethod
    def kabs(cls, data: dict) -> float:
        return cls.f_kabs(value=data.get('kabs'))

    @classmethod
    def P0(cls, data: dict) -> float:
        return cls.f_P0(value=data.get('P0'))

    @classmethod
    def t0(cls, data: dict) -> float:
        return 1 / (cls.kabs(data=data) * u0)

    @classmethod
    def beta(cls, data: dict) -> float:
        return cls.t0(data=data) / cls.tp(data=data)

    @classmethod
    def a1(cls, data: dict) -> float:
        return kte * cls.t0(data=data) / (roe * Ce * cls.r0(data=data) ** 2)

    @classmethod
    def a2(cls, data: dict) -> float:
        return cls.kabs(data=data) ** 2 * cls.r0(data=data) ** 2

    @classmethod
    def b1(cls, data: dict) -> float:
        return cls.kabs(data=data) * cls.P0(data=data) * cls.t0(data=data) * cls.beta(data=data) / (roe * Ce * T00)

    @classmethod
    def cc1(cls, data: dict) -> float:
        return gamma * cls.t0(data=data) / (roe * Ce)

    @classmethod
    def cc2(cls, data: dict) -> float:
        return gamma * cls.t0(data=data) / (roi * Ci)


class Validation:
    @staticmethod
    def validate_data(data: dict):
        return False if len(data.keys()) != 4 else True


