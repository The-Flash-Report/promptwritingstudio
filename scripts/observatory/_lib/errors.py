class ObservatoryError(Exception):
    pass


class TransientProviderError(ObservatoryError):
    """5xx, 429, network timeout — retryable."""


class AuthProviderError(ObservatoryError):
    """401, 403 — aborts the whole run."""


class CostCapAbort(ObservatoryError):
    """Hard monthly cost ceiling reached."""


class SchemaValidationError(ObservatoryError):
    pass


class ImmutableWriteError(ObservatoryError):
    pass


class MalformedJudgeOutput(ObservatoryError):
    pass
